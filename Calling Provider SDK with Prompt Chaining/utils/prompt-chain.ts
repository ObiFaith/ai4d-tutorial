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
  Customer intent:
  ${userIntent}

  Complaint:
  ${complaint}

  Based on the complaint and customer intent, list one or more possible categories.

  Available categories:
  ${categories.join(", ")}

  Return only valid JSON:

  {
    "possibleCategories": [
      "...",
      "..."
    ]
  }
  `;
  const possibleCategories = await callOpenRouterSdk(categoryPrompt);
  console.log("Possible categories:\n", possibleCategories);

  // Select best category for the complaint
  const bestCategoryPrompt = `
  Customer intent:
  ${userIntent}

  Possible categories:
  ${possibleCategories}

  Complaint:
  ${complaint}

  Choose the single best category.

  Return only valid JSON:

  {
    "selectedCategory": "...",
    "reason": "..."
  }
  `;

  const selectedCategory = await callOpenRouterSdk(bestCategoryPrompt);
  console.log("Selected category:\n", selectedCategory);

  // Extract additional details from complaint
  const extraInfoPrompt = `
  Complaint:
  ${complaint}

  Selected category:
  ${selectedCategory}

  Extract any additional information needed to resolve this request.

  Return only valid JSON.
  `;
  const extraInfo = await callOpenRouterSdk(extraInfoPrompt);
  console.log("Additional details:\n", extraInfo);

  // Generate a short response
  const responsePrompt = `
  Complaint:
  ${complaint}

  Customer intent:
  ${userIntent}

  Selected category:
  ${selectedCategory}

  Additional information:
  ${extraInfo}

  Write a short, friendly response to the customer.
  If important information is missing, politely ask for it.
  `;
  const userResponse = await callOpenRouterSdk(responsePrompt);
  console.log("User response:\n", userResponse);
};
