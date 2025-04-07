import * as dotenv from "dotenv";
dotenv.config();

const environment = process.env.VITE_ENVIRONMENT;
if (environment !== "production") {
  console.log(`             ${"-".repeat(environment.length + 4)}`);
  console.error(`Environment: | ${environment} |`);
  console.log(`             ${"-".repeat(environment.length + 4)}`);
  process.exit(1); // Exit with a non-zero code to indicate failure
} else if (environment === "production") {
  console.log("Check passed. Proceeding...");
  process.exit(0); // Exit with a zero code to indicate success
}
