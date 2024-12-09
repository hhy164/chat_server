import { Types } from 'mongoose';
import { User } from '../../models/user.model';
import { sign } from 'jsonwebtoken';

export const createTestUser = async () => {
  const user = await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  });

  const userId = user._id.toString();
  const token = sign({ id: userId }, process.env.JWT_SECRET as string);

  return { user, token };
};

export const generateObjectId = () => new Types.ObjectId().toString(); 