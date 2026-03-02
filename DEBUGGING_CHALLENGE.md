# Debugging Challenge: Add Transaction Feature

A new "Add Transaction" feature was added to the Transactions page. Users can click "+ New Transaction", fill out a form, and submit. However, the feature has **3 bugs** that cause crashes and incorrect behavior.

## How to Reproduce

1. Run the app with `npm run dev`
2. Navigate to the **Transactions** page
3. Click **"+ New Transaction"**
4. Try submitting a **Deposit** transaction (type: Deposit, fill in name, any amount details)
5. The app crashes immediately
6. Even after fixing that crash, try submitting a **Buy** transaction and watch the summary totals break

## Your Task

Find and fix all 3 bugs. They span across these files:

- `src/data.js` — the `buildTransaction()` utility function
- `src/components/TransactionForm.jsx` — the new form component
- `src/pages/Transactions.jsx` — the page that wires everything together

## Hints

1. **Bug 1 (crash)**: A Deposit transaction sets a field to `null` that a downstream function tries to call a method on. Look at how the form prepares data for different transaction types.
2. **Bug 2 (crash)**: After fixing bug 1, the search filter in the transactions list doesn't handle a `null` field on the new transaction, causing a `TypeError`.
3. **Bug 3 (wrong output)**: After fixing the crashes, add any transaction and look at the summary cards (Total Buys, Total Sells, etc.). The totals display incorrectly. Look at the data type returned by `buildTransaction()`.

## Difficulty

Medium — each bug looks like an honest mistake a developer might make. They're layered: fixing one reveals the next.
