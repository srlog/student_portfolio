const { Achievement, Student, Admin } = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const approveAchievement = async (req, res) => {
  try {
    const { achievement_id } = req.params;
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const achievement = await Achievement.findByPk(achievement_id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    if (req.user.name === "Placement_cell") {
      await achievement.update({ approved_by_placement: true });
      res.status(200).json({
        message: "Achievement approved by placement cell",
        achievement,
      });
    } else {
      await achievement.update({ approved_by_admin: true });
      res.status(200).json({
        message: "Achievement approved by admin",
        achievement,
      });
    }
  } catch (error) {
    console.error("Error in approving achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAcheivementById = async (req, res) => {
  try {
    const { achievement_id } = req.params;
    const achievement = await Achievement.findByPk(achievement_id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res.status(200).json({ achievement });
  } catch (error) {
    console.error("Error in fetching achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAcheivementByStudentId = async (req, res) => {
  try {
    const { student_id } = req.params;
    const achievements = await Achievement.findAll({
      where: { student_id },
    });
    if (!achievements) {
      return res.status(404).json({ message: "Achievements not found" });
    }

    const result = {};
    achievements.forEach((achievement) => {
      const type = achievement.type;
      result[type + "s"] = result[type + "s"] || [];
      result[type + "s"].push(achievement);
    });

    result.total_achievements = achievements.length;

    result.total_number_of_certificates = result.certificates
      ? result.certificates.length : 0;
    result.total_number_of_internships = result.internships
      ? result.internships.length : 0;
    result.total_number_of_projects = result.projects
        ? result.projects.length : 0;
    result.total_number_of_online_courses = result.online_courses
      ? result.online_courses.length : 0;
    result.total_number_of_hackathons = result.hackathons
        ? result.hackathons.length : 0;
    result.total_number_of_paper_presentations = result.paper_presentations
        ? result.paper_presentations.length : 0;
    
    

    res.status(200).json({ achievements: result });
  } catch (error) {
    console.error("Error in fetching achievements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAcheivementByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    const students = await Student.findAll({
      where: { department },
      attributes: ["id"],
    });
    if (!students) {
      return res.status(404).json({ message: "Students not found" });
    }
    const student_ids = students.map((student) => student.id);
    const achievements = await Achievement.findAll({
      where: { student_id: student_ids },
    });
    if (!achievements) {
      return res.status(404).json({ message: "Achievements not found" });
    }
    res.status(200).json({ achievements });
  } catch (error) {
    console.error("Error in fetching achievements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAcheivementByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const students = await Student.findAll({
      where: { year },
      attributes: ["id"],
    });
    if (!students) {
      return res.status(404).json({ message: "Students not found" });
    }
    const student_ids = students.map((student) => student.id);
    const achievements = await Achievement.findAll({
      where: { student_id: student_ids },
    });
    if (!achievements) {
      return res.status(404).json({ message: "Achievements not found" });
    }
    res.status(200).json({ achievements });
  } catch (error) {
    console.error("Error in fetching achievements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

