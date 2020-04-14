import { MiddlewareFn } from "type-graphql";

export const ErrorInterceptor: MiddlewareFn<any> = async (
  { context, info },
  next
) => {
  try {
    return await next();
  } catch (err) {
    console.error(err, context, info);
    throw err;
  }
};
