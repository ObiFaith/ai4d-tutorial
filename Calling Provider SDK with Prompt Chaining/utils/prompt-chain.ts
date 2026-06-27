import { callOpenRouterSdk } from "./call-open-router-sdk";

export const PromptChain = async (complaint: string) => {
  // Build an intelligent customer support system for a bank that converses with customers and helps solve their problems.
  // Understand what the customer is asking or reporting.
  const intentPrompt = `
    You are a customer agent. Your job is to listen to a client complaints and determine the intent in a few words.
    I want you to determine the intent of this complaint. Use a maximum of 3 or 4 words.
    Here is the complaint:
    ${complaint}
  `;
  const userIntent = await callOpenRouterSdk(intentPrompt);
  console.log("Customer intent:", userIntent);

  // Suggest one or more categories that might apply.
  const categories = [
    "Account Opening",
    "Billing Issue",
    "Account Access",
    "Transaction Inquiry",
    "Card Services",
    "Account Statement",
    "Loan Inquiry",
    "General Information",
  ];
  const categoryPrompt = `
    Based on the following list of categories: ${categories.join(",")}, determine one or more categories that might apply.
    Use the complaint to help make this decision. Use a JSON format to return the decision.
    {
      "matching category": "...",
      "possible categories": ["...", "..."]
    }

    Here is the complaint:
    ${complaint}
  `;
  const complaintCategory = await callOpenRouterSdk(categoryPrompt);
  console.log("Complaint category:\n", complaintCategory);

  // Extract additional details from complaint
  const extraInfoPrompt = `
    Extract any useful information from the complaint that can help us resolve the issue.
    This can include things like transaction date, amount, card type, names of people or places, etc. Use a JSON format to return the information.
    Here is the complaint:
    ${complaint}
  `;
  const extraInfo = await callOpenRouterSdk(extraInfoPrompt);
  console.log("Additional details:\n", extraInfo);

  // Generate a short response
  const responsePrompt = `
    Based on the extracted informtion and matching category, compose a short friendly composed to the user. Make it more humanu as possible

    Extracted information:
    ${extraInfo}

    Complaint category:
    ${complaintCategory}

    Original complaint:
    ${complaint}
  `;
  const userResponse = await callOpenRouterSdk(responsePrompt);
  console.log("User response:\n", userResponse);
};
