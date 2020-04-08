/** @format */

import mongoose from 'mongoose';

export default async () => {
  if (mongoose.connections[0].readyState) return;

  // The following options were selected based on this article
  // https://mongoosejs.com/docs/deprecations.html#-ensureindex-
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};
