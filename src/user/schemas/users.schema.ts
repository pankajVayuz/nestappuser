import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
/** create user schema */

/**@Schema() decorator marks a class as a schema definition. It maps our Cat class to a MongoDB collection  */
@Schema()
export class User {
  /**@Prop() decorator defines a property in the document. */
  @Prop()
  username: string;

  /**@Prop() decorator defines a property in the document. */
  @Prop()
  email: string;

  /**@Prop() decorator defines a property in the document. */
  @Prop()
  password: string;
}

/**export userSchema model */
export const UserSchema = SchemaFactory.createForClass(User);
