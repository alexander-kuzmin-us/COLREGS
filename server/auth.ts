import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import connectPg from "connect-pg-simple";
import type { Express, RequestHandler } from "express";
import { storage } from "./storage";

// Configure session store
export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  
  return session({
    secret: process.env.SESSION_SECRET || "your-secret-key-change-this",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: sessionTtl,
    },
  });
}

// Initialize authentication
export async function setupAuth(app: Express) {
  // Configure session middleware
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  // Only configure Google OAuth if credentials are provided
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    // Configure Google OAuth strategy
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.REPLIT_DEV_DOMAIN 
            ? `https://${process.env.REPLIT_DEV_DOMAIN}/api/auth/google/callback`
            : "http://localhost:5000/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            // Extract user info from Google profile
            const userData = {
              id: profile.id,
              email: profile.emails?.[0]?.value || "",
              name: profile.displayName || "",
              picture: profile.photos?.[0]?.value || "",
            };

            // Upsert user in database
            const user = await storage.upsertUser(userData);
            return done(null, user);
          } catch (error) {
            return done(error, false);
          }
        }
      )
    );
  }

  // Serialize/deserialize user for session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Authentication routes - only if Google OAuth is configured
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    app.get("/api/auth/google", 
      passport.authenticate("google", { scope: ["profile", "email"] })
    );

    app.get("/api/auth/google/callback",
      passport.authenticate("google", { 
        successRedirect: "/",
        failureRedirect: "/login-failed"
      })
    );
  } else {
    // Fallback routes when OAuth is not configured
    app.get("/api/auth/google", (req, res) => {
      res.status(503).json({ error: "Google OAuth not configured" });
    });

    app.get("/api/auth/google/callback", (req, res) => {
      res.status(503).json({ error: "Google OAuth not configured" });
    });
  }

  app.get("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.redirect("/");
    });
  });

  app.get("/api/auth/user", (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  });
}

// Middleware to check if user is authenticated
export const requireAuth: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Authentication required" });
};

// Middleware that allows both authenticated and guest users
export const optionalAuth: RequestHandler = (req, res, next) => {
  // Always proceed, but req.user will be null for guests
  next();
};