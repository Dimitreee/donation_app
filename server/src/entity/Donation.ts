import {Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn} from "typeorm";

export const CURRENCIES = ["USD", "EUR", "GBP", "RUB"];

@Entity("donations")
export class Donation {
    @PrimaryGeneratedColumn()
    @ObjectIdColumn()
    id:string;

    @Column("number")
    amount:number;

    @Column("enum", {enum: CURRENCIES})
    currency:string;
}
