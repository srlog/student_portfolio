const { Leave, OD, Student, Project } = require("../models/index");

const isAdmin = (req, res, next) => {
  // req.user is set by the auth middleware
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required.",
      currentRole: "none",
    });
  }

  // If user is authenticated but not an admin
  if (req.user.role !== "Admin") {
    return res.status(403).json({
      message: "Access denied. Admin only.",
      currentRole: req.user ? req.user.role : "none",
    });
  }
  next();
};

const isAdminOrOwnerLeave = async (req, res, next) => {
  console.log("req.user", req.user);
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Access denied. Authentication required." });
  }

  try {
    const leave = await Leave.findOne({ where: { id: req.params.id } });

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (req.user.role === "admin" || req.user.id === leave.student_id) {
      return next();
    } else {
      return res.status(403).json({
        message: "Access denied. Admin or owner only.",
        currentRole: req.user.role,
        currentUserId: req.user.id,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error checking leave ownership",
      error: error.message,
    });
  }
};

const isAdminOrOwnerOD = async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Access denied. Authentication required." });
  }

  try {
    const od = await OD.findOne({ where: { id: req.params.id } });

    if (!od) {
      return res.status(404).json({ message: "OD not found" });
    }

    if (req.user.role === "admin" || req.user.id === od.student_id) {
      return next();
    } else {
      return res.status(403).json({
        message: "Access denied. Admin or owner only.",
        currentRole: req.user.role,
        currentUserId: req.user.id,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error checking OD ownership",
      error: error.message,
    });
  }
};
const isAdminOrSelfOD = async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Access denied. Authentication required." });
  }

  try {
    if (req.user.role === "Admin" || req.user.id === parseInt(req.params.id, 10)) {
      return next();
    } else {
      return res.status(403).json({
        message: "Access denied. Admin or owner only.",
        currentRole: req.user.role,
        currentUserId: req.user.id,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error checking OD ownership",
      error: error.message,
    });
  }
};

module.exports = {
  isAdmin,
  isAdminOrOwnerLeave,
  isAdminOrOwnerOD,
  isAdminOrSelfOD,
};
