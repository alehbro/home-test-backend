import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UrlsCreationAttrs {
  fullUrl: string;
  tinyUrl: string;
}

@Table({ tableName: 'urls' })
export class Urls extends Model<Urls, UrlsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  fullUrl: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  tinyUrl: string;
}
