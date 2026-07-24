import { Router, type Request, type Response } from "express";
import {
    zCourseId,
  zStudentId,
} from "../libs/zodValidators.js";
import type { Student, Course, Enrollment } from "../libs/types.js";

// import database
import { students, courses, enrollments } from "../db/db.js";

const router = Router();

// GET /api/v1/enrollments
router.get("/", (req: Request, res: Response) => {
  try {
    const { studentId, courseId } = req.query;

    //2.3ตรวจสอบว่าต้องกำหนด studentId หรือ courseID อย่างใดอย่างหนึ่งห้ามส่งมาทั้งคู่หรือว่างเปล่า
    if ((!studentId && !courseId) || (studentId && courseId)) {
      return res.status(400).json({
        success: false,
        message: "Please provide either studentId or courseNo and not both!!?",
      });
    }

    // 2.1 ค้นหาด้วย courseId
    if (courseId) {
        const courseIdStr = String(courseId);
        if (courseIdStr.length !== 6) {
            return res.status(400).json({
                success: false,
                message: "Course Id must contain 6 characters",
        });
      }
      const result_e = enrollments
        .filter((e) => e.courseId === courseId)
        .map((e) => students.find((s) => s.studentId === e.studentId))

      return res.status(200).json({
        success: true,
        data: result_e,
      });
    }

    // 2.2 ค้นหาด้วยstudentId
    if (studentId) {
        const studentIdStr = String(studentId);
        if (studentIdStr.length !== 9) {
            return res.status(400).json({
                success: false,
                message: "Student Id must contain 9 characters",
        });
      }
      
      const result_s = enrollments
        .filter((e) => e.studentId === studentId)
        .map((e) => courses.find((s) => s.courseId === e.courseId))

      return res.status(200).json({
        success: true,
        data: result_s,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something is wrong, please try again",
      error: err,
    });
  }
});

export default router;