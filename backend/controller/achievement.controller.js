const { Achievement, Student, Admin } = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createAchievement = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      title,
      specialization,
      issued_by,
      issued_date,
    } = req.body;
    const { id: student_id } = req.user; // Assuming you have a way to get the logged-in admin's ID

    const achievement = await Achievement.create({
      name,
      description,
      type,
      title,
      specialization,
      issued_by,
      issued_date,
      student_id,
    });

    res
      .status(201)
      .json({ message: "Achievement created successfully", achievement });
  } catch (error) {
    console.error("Error in creating achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// While editing a new popup should open with loading the previous data
// and then the user can edit and save it again
const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      type,
      title,
      specialization,
      issued_by,
      issued_date,
    } = req.body;

    const achievement = await Achievement.findByPk(id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    await achievement.update({
      name,
      description,
      type,
      title,
      specialization,
      issued_by,
      issued_date,
      approved_by_department: false,
      approved_by_placement: false,
    });

    res.status(200).json({ message: "Achievement updated successfully" });
  } catch (error) {
    console.error("Error in updating achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

    const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await Achievement.findByPk(id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    await achievement.destroy();
    res.status(200).json({ message: "Achievement deleted successfully" });
  } catch (error) {
    console.error("Error in deleting achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.findAll({
      include: [
        {
          model: Student,
          attributes: ["name", "email"],
        },
        {
          model: Admin,
          attributes: ["name", "email"],
        },
      ],
    });

    res
      .status(200)
      .json({ message: "Achievements fetched successfully", achievements });
  } catch (error) {
    console.error("Error in fetching achievements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
