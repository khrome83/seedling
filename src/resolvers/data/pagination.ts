import {
  Request,
  Response,
} from "https://raw.githubusercontent.com/use-seedling/seedling/master/mod.ts";

interface Pagination {
  page: string;
}

export default async (request: Request, response: Response) => {
  const { page } = request.attrs as Pagination;

  switch (page) {
    case "0":
      return response.skip({ page });
    case "1":
    case "2":
      return response.success({ page });
    default:
      return response.end({ page });
  }
};
