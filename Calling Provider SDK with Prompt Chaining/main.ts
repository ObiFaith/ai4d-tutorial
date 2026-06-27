import { PromptChain } from "./utils";

const complaint = process.argv[2];

if (!complaint) {
  console.log("Please provide a complaint");
  process.exit(1);
}

PromptChain(complaint);
