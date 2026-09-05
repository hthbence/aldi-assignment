# Add to Shopping List

## Understanding and analysing the feature

### Access and Authentication

- The Shopping Lists functionality is available only to authenticated users.
- Shopping Lists can be accessed through **Account - Your saved lists**.
- The Shopping Lists page is also directly accessible via: https://www.aldi.us/store/account/your-lists
- If the user has no existing shopping lists, the system displays a message indicating that no saved lists exist and provides the option to create a new list.

### Creating a Shopping List

The user can initiate the creation of a Shopping List from two locations on the **Your saved lists** page:

- **Create new list** button in the page header.
- **Create new list** button in the main content area.

#### Create New List Modal

When either button is selected:

- A **Create new list** modal is displayed.
- The modal contains a list name input field.
- The **Create List** button is disabled when the list name is empty.
- The **Create List** button becomes enabled once a list name is entered.

After the user enters a valid list name and selects **Create List**:

- The shopping list is created.
- An **Add items to list** tutorial is displayed.

#### Add Items Tutorial

The tutorial modal contains:

- Title: **Add items to list**
- Instructional text explaining how to add products to the list.
- A GIF demonstrating the process.
- **Browse items** button.
- Close (**X**) button.

When **Browse items** is selected, the user is navigated to the ALDI storefront: https://www.aldi.us/store/aldi/storefront

### Adding Products to a Shopping List

From the storefront, the user can select a product to open its Product Details page.

The Product Details page provides:

- Product information.
- Quantity selection.
- **Add to Saved list** button with a Bookmark icon.

When **Add to Saved list** is selected, the system displays a list-selection dropdown.

#### Existing Lists

If the user has existing shopping lists:

- All available lists are displayed.
- Each list has a checkbox.
- Multiple lists can be selected simultaneously.
- If the product is already saved to one or more lists, the corresponding checkboxes are pre-selected.
- If no list is selected, the **Save to list** button remains disabled.
- Selecting one or more lists enables the **Save to list** button.

#### Saving to Existing Lists

When the user selects one or more lists and clicks **Save to list**:

- The product is saved to all selected lists.
- If a single list is selected, a toast notification confirms that the item was saved to that list.
- If multiple lists are selected, the toast confirms that the item was saved to the selected number of lists.
- The toast contains a navigation button:
  - **View list** when one list was selected.
  - **View lists** when multiple lists were selected.

Selecting:

- **View list** navigates directly to the selected Shopping List.
- **View lists** navigates to the **Your saved lists** page.

#### Removing an Existing List Association

If a product is already associated with a list:

- Its checkbox is displayed as selected.
- If the user unchecks the list, the product is removed from that list when the changes are saved.

### Creating a New List While Saving a Product

From the list-selection dropdown, the user can select **Create new list**.

The dropdown changes to a **Create new list** view containing:

- Back button.
- **Create new list** title.
- **Name your list** input field.
- **Create list** button.

The **Create list** button remains disabled until a list name is entered.

When the user enters a name and selects **Create list**:

- A new shopping list is created.
- The current product is automatically added to the newly created list.
- A toast notification appears in the bottom-left corner confirming that the item was saved.
- The toast identifies the newly created list.

### Your Saved Lists Page

Once shopping lists have been created, they are displayed on the **Your saved lists** page.

Each list is represented by a list card containing:

- List name.
- **Show all [number] items** button.
- Products belonging to the list.
- **Add** button for products.
- Product stock information.

Selecting **Show all [number] items** opens the dedicated Shopping List page.

### Shopping List Details Page

The dedicated Shopping List page contains:

- Shopping List name.
- **Add all to cart** button.
- **Manage list** button.
- List of products.
- **Add** button for each product.
- Product stock information.

#### Add All Items to Cart

When **Add all to cart** is selected:

- All products in the Shopping List are added to the cart.
- The user is navigated to / shown the cart.

### Managing a Shopping List

Selecting **Manage list** opens a dropdown containing:

- **Rename list**
- **Add items**
- **Remove items**
- **Delete list**

**Delete list** is visually distinguished with red as a destructive action.

#### Rename List

electing **Rename list** opens a **Rename list** modal containing:

- Close (**X**) button.
- **Name your list** input field.
- Current list name populated in the input.
- **Save** button.
- **Cancel** button.

When the user enters a new name and selects **Save**:

- The list name is updated.
- The modal closes.

When the user selects either **Cancel** or **X**:

- The modal closes.
- The existing list name remains unchanged.

#### Add Items

Selecting **Add items** opens the **Add items to list** tutorial.

The tutorial provides instructions on how to add additional products to the Shopping List.

#### Remove Items

Selecting **Remove items** opens an **Edit list** modal containing:

- Close (**X**) button.
- **Edit list** title.
- List of products.
- Bin/Delete icon for each product.
- **Done** button.

When the user selects the Bin icon for a product:

- The product is removed from the list displayed in the modal.
- The change is not committed to the actual Shopping List immediately.

When the user selects **Done**:

- All pending removals are committed.
- The selected products are removed from the Shopping List.
- A toast notification confirms how many items were removed.

If the user selects **X** before selecting **Done**:

- The modal closes.
- Pending changes are discarded.
- The products remain in the Shopping List.

#### Delete List

Selecting **Delete list** opens a confirmation modal containing:

- Close (**X**) button.
- Title: **Delete this list and all its items?**
- Confirmation text explaining that the list and its items will be permanently deleted.
- **Delete list** button.
- **Cancel** button.

The **Delete list** button is visually distinguished with red as a destructive action.

When **Cancel** or **X** is selected:

- The modal closes.
- The Shopping List remains unchanged.

When **Delete list** is selected:

- The Shopping List and all associated items are permanently deleted.
- A toast notification appears confirming that the list was deleted.

---

## Manual Test Cases

### Approach

The test cases were selected based on a risk-based testing approach. I identified the following 3 as the highest priority: core functionality, data integrity and authentication/tenancy. Since no Acceptance Criteria is available, I opted for high-level validation test cases from the end user's point of view.

### Test Cases

#### Test Case #1

| ID     | Title                                          | Description                                                                                                                                            |
| ------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CF-001 | Creating a shopping list and adding a product. | The user must be able to successfully create a shopping list and add a product to that list. The shopping list must feature the corresponding product. |

| Preconditions                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------- |
| The user is logged in to the system. No shopping lists are available for the user. At least one product is available on the front page. |

| Step # | Step Description                                                                                    | Test Data                                              | Expected Results                                                                                                                                                                                                                                                                                          |
| ------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.     | Navigate to the front page.                                                                         | N/A                                                    | The front page is displayed. The User Account is present in the main horizontal menu strip.                                                                                                                                                                                                               |
| 2.     | Tap/hover on the User Account and select the Your saved lists menu item from the dropdown.          | N/A                                                    | The Your saved lists page is displayed. The system indicates that the user has no saved lists yet. A Create new list button is displayed in the header and another Create new list button is displayed in the main content area.                                                                          |
| 3.     | Click/tap on the Aldi logo to return to the front page. Click/tap on a product (**Product A**).     | N/A                                                    | The product details page is displayed for **Product A**. The Add to Saved List button is displayed on the page.                                                                                                                                                                                           |
| 4.     | Click/tap on the Add to Saved List button.                                                          | N/A                                                    | A system indicates that the user has no saved lists yet. A Create new list button is displayed. The Save to list button is disabled.                                                                                                                                                                      |
| 5.     | Attempt to save the product without entering a name by clicking/tapping on the Save to list button. | N/A                                                    | No action is taken place.                                                                                                                                                                                                                                                                                 |
| 6.     | Click/tap on the Create new list button.                                                            | N/A                                                    | The system allows the user to enter a name for the list. A Create list button is displayed but disabled.                                                                                                                                                                                                  |
| 7.     | Attempt to create a new list without entering a name by clicking/tapping on the Create list button. | N/A                                                    | No action is taken place.                                                                                                                                                                                                                                                                                 |
| 8.     | Enter a name (**Shopping List A**) for the list.                                                    | Examples for **Shopping List A**: My list 1, Groceries | **Shopping List A** is displayed in the Name your list field. The Create list button is enabled.                                                                                                                                                                                                          |
| 9.     | Select the Create list button.                                                                      | N/A                                                    | A toast is displayed in the bottom-left corner, providing feedback to the user that the item is successfully saved to **Shopping List A**. A View list button is displayed on the toast.                                                                                                                  |
| 10.    | Click/tap on the View list button.                                                                  | N/A                                                    | The user is navigated to the Your saved lists page. The title of the page is **Shopping List A**. The following buttons are present on the page: Add all to cart and Manage list. **Product A** is listed on the page with an Add button and stock information. No other products are listed on the page. |
| 11.    | Navigate to the front page, then navigate to the Your saved lists page.                             | N/A                                                    | **Shopping List A** is listed on the Your saved lists page. **Product A** is displayed on the shopping list card. No other products are displayed on the card.                                                                                                                                            |

#### Test Case #2

| ID     | Title                                 | Description                                                                                                                 |
| ------ | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| DI-001 | Adding products to the shopping list. | The user must be able to add multiple products to a shopping list. The user must be able to create multiple shopping lists. |

| Preconditions                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The user is logged in to the system. A shopping list is available for the user with only 1 product. At least two products are available on the front page. |

| Step # | Step Description                                                                                                                                                                                                                                                         | Test Data                                                    | Expected Results                                                                                                                                                                                                                                                     |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.     | Navigate to the Your saved lists page.                                                                                                                                                                                                                                   | N/A                                                          | The Your saved lists page is displayed with a shopping list (**Shopping List A**) and a product (**Product A**). No other products are displayed for the shopping list, and there are no other shopping lists listed on the page.                                    |
| 2.     | Click/tap on **Product A**. Select the Add to Saved List button.                                                                                                                                                                                                         | N/A                                                          | **Shopping List A** is listed on the dropdown with the checkbox check-marked.                                                                                                                                                                                        |
| 3.     | Click/tap on the Save to list button.                                                                                                                                                                                                                                    | N/A                                                          | No action is taken place.                                                                                                                                                                                                                                            |
| 4.     | Click/tap on the Back button. Refresh the page.                                                                                                                                                                                                                          | N/A                                                          | **Product A** is only listed once on the card of **Shopping List A**. No other products are listed. No other lists are listed on the page.                                                                                                                           |
| 5.     | Navigate to the front page and locate another product. Add the product (**Product B**) to **Shopping List A**. Navigate to the Your saved lists page.                                                                                                                    | N/A                                                          | Only **Shopping List A** is displayed with **Product A** and **Product B**.                                                                                                                                                                                          |
| 6.     | Select the Create new list button. Enter a name (**Shopping List B**) for the shopping list. Close the tutorial pop-up if it displays. Navigate to the frontpage. Locate **Product B**. Add **Product B** to **Shopping List B**. Navigate to the Your saved lists page. | Examples for **Shopping List B**: My list 2, Lunch for today | The Your saved lists page is displayed with **Shopping List A** and **Shopping List B**. **Shopping List A** features **Product A** and **Product B**. **Shopping List B** features **Product B** only. No other shopping lists and products are listed on the page. |

#### Test Case #3

| ID       | Title                                                           | Description                                                                              |
| -------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| AUTH-001 | Attempting to access the shopping list without being logged in. | The system must not allow access to the shopping list feature for unauthenticated users. |

| Preconditions                                                                               |
| ------------------------------------------------------------------------------------------- |
| The user is not logged in to the system. At least 1 product is available on the front page. |

| Step # | Step Description                                                            | Expected Results                                                                                |
| ------ | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 1.     | Navigate to the front page.                                                 | The User Account is not displayed in the horizontal menu strip.                                 |
| 2.     | Locate a product. Click on the product.                                     | The product details page is displayed. The Add to Saved List button is not present on the page. |
| 3.     | Navigate to the following URL: https://www.aldi.us/store/account/your-lists | The login page is displayed.                                                                    |

---

## Bug Reports

### 1. View List Button is Not Registered on the Toast Notification on the First Click

| Environment | OS           | Browser                   | Priority |
| ----------- | ------------ | ------------------------- | -------- |
| Production  | MacOS 26.0.1 | Firefox 154.0.1 (aarch64) | Low      |

#### Steps to Reproduce

1. Login to the system.

2. Navigate to a product.

3. Select the Add to Saved List button.

4. Add the product to an already existing, or to a newly created shopping list.

5. On the toast, click/tap on the View List button.

#### Actual Results

The user is not navigated to the list, but to the storefront.

Workaround: The user has to click/tap on the button again for it to work properly.

#### Expected Results

The user is navigated to the corresponding shopping list.

#### Objective Evidence

See view_list_bug.gif

---

## Recommended Enhancements

### 1. Avoid repeatedly displaying the Add items to list tutorial

#### Current behavior

The Add items to list tutorial is displayed after every new shopping list is created, even if the user has previously created a list and has already been exposed to the tutorial.

#### Recommendation

Display the tutorial only the first time a user creates a shopping list, or provide an option such as "Don't show this again".

#### Explanation

For returning users, repeatedly displaying the same tutorial adds unnecessary friction to the workflow. Once the user has familiarity with the functionality, the tutorial is unlikely to provide additional value and can be annoying.

### 2. Allow users to specify quantities for saved products

#### Current behavior

Users can select a product quantity on the Product Details page, but the Shopping List itself does not appear to provide a way to specify or manage the desired quantity of a saved product.

#### Recommendation

Allow users to define and update the desired quantity directly from the Shopping List, for example using a quantity selector next to each saved product.

#### Explanation

Shopping lists are primarily used for planning purchases. Allowing users to specify quantities would make the feature more useful and reduce the need to remember quantities.
