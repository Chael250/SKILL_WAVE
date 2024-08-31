import { Instructor } from "src/instructors/entities/instructor.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "courses"})
export class Course {
    @PrimaryGeneratedColumn("uuid")
    courseId: string

    @Column({type: "text"})
    courseName: string

    @Column({type: "text"})
    courseDescription: string

    @Column({type: "text"})
    @ManyToMany(() => Instructor, (instructor) => instructor.courses)
    authors: string    
}
