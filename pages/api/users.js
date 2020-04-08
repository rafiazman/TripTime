/** @format */

import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcryptjs';
import User from '../../app/models/User';
import connectToDb from '../../app/connectToDb';

const handler = async (req, res) => {
  await connectToDb();

  if (req.method === 'POST') {
    const { email, name, password } = req.body;

    if (!isEmail(email)) {
      return res.send({
        status: 'error',
        message: 'The email you entered is invalid',
      });
    }

    User.where({ email })
      .countDocuments()
      .then(count => {
        if (count)
          return Promise.reject(Error('The email has already been used'));

        const hashedPwd = bcrypt.hashSync(password, 10);

        const newUser = User.create({ email, name, password: hashedPwd });
        newUser
          .then(() => {
            res.status(201).send({
              status: 'ok',
              message: 'User signed up successfully',
            });
          })
          .catch(err => Promise.reject(err));
      })
      .catch(error => {
        res.send({
          status: 'error',
          message: error.toString(),
        });
      });
    return;
  }

  // Return 405 Method Not Allowed
  return res.status(405).end();
};

export default handler;
