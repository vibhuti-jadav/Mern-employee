

import express from "express"
import employController from "../controller/employController.js"

const router = express.Router()

router.post("/add",employController.addEmploy)
router.get("/allEmployee",employController.allEmployee)
router.get("/:id",employController.specificEmploy)
router.patch("/:id",employController.updateEmployee)
router.delete("/:id",employController.deleteEmploye)
router.post("/login",employController.login)

export default router