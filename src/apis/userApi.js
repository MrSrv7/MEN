let userApiObject = {};

const loginSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      example: "john@example.com",
      required: true,
    },
    password: {
      type: "string",
      example: "123456",
      required: true,
    },
  },
};

const userSchema = {
  type: "object",
  properties: {
    fullName: {
      type: "string",
      example: "John Doe",
    },
    email: {
      type: "string",
      example: "john@example.com",
      required: true,
    },
    password: {
      type: "string",
      example: "123456",
      required: true,
    },
  },
};

const userApiArr = [
  {
    path: "/user/profile",
    respondWith: {
      tag: ["User"],
      get: {
        tags: ["User"],
        parameters: [
          {
            name: "token",
            in: "header",
            type: "string",
            required: true,
          },
        ],
        description: "Get Currently Logged in User",
        responses: {
          "200": {
            description: "Profile fetched Successfully",
          },
          "404": {
            description: "Profile not found",
          },
        },
      },
    },
  },
  {
    path: "/user/all",
    respondWith: {
      get: {
        tags: ["User"],
        parameters: [
          {
            name: "token",
            in: "header",
            type: "string",
            required: true,
          },
        ],
        description: "Get All Users",
        responses: {
          "200": {
            description: "UsersList fetched Successfully",
          },
          "404": {
            description: "No Users found",
          },
        },
      },
    },
  },
  {
    path: "/user/register",
    respondWith: {
      post: {
        tags: ["User"],
        description: "Register a User",

        requestBody: {
          content: {
            "application/json": {
              schema: userSchema,
            },
          },
        },
        responses: {
          "201": {
            description: "Registered User Successfully",
          },
          "400": {
            description: "User already registered",
          },
        },
      },
    },
  },
  {
    path: "/user/login",
    respondWith: {
      post: {
        tags: ["User"],
        description: "Logs n a User",

        requestBody: {
          content: {
            "application/json": {
              schema: loginSchema,
            },
          },
        },
        responses: {
          "201": {
            description: "Logged in User Successfully",
          },
          "404": {
            description: "User Account not found",
          },
          "417": {
            description: "Please fill in the required fields",
          },
        },
      },
    },
  },
];

userApiArr.map((api) => (userApiObject[api.path] = api.respondWith));

export default userApiObject;
