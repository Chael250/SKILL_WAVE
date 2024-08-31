import { Course } from "src/courses/entities/course.entity";
import { Student } from "src/students/entities/student.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "instructors"})
export class Instructor {
    @PrimaryGeneratedColumn("uuid")
    instructorId: string

    @Column({type: "text"})
    instructorName: string

    @Column({type: "text", unique: true})
    email: string

    @Column({type: "text"})
    tel: string

    @Column({type: "text"})
    password: string

    @Column({type: "text", nullable: true})
    refreshToken: string

    @ManyToMany(() => Course, (course) => course.authors)
    courses: Course[]

    @ManyToMany(() => Student, (student) => student.instructors)
    students:Student[]
}
