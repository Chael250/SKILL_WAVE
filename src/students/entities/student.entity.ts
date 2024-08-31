import { Instructor } from "src/instructors/entities/instructor.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "students"})
export class Student {
    @PrimaryGeneratedColumn("uuid")
    studentId: string

    @Column({type: "text"})
    studentName: string

    @Column({type: "text", unique: true})
    studentEmail: string

    @Column({type: "text"})
    studentTel: string

    @Column({type: "text"})
    studentPassword: string

    @Column({type: "text", nullable: true})
    refreshToken: string

    @ManyToMany(() => Instructor, (instructor) => instructor.students)
    instructors: Instructor[]

}
