import { Request, Response, NextFunction } from "express";
import { ContextRunner } from "express-validator";//validation rule

const validateBodyData = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const allValidationErrors = [];

    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        allValidationErrors.push(result.array()[0]);
      }
    }

    if (allValidationErrors.length > 0) {
      return res.status(400).json({
        message: "Invalid submitted data!",
        error: {
          details: allValidationErrors,
        },
      });
    }

    next();
  };
};

export default validateBodyData;
