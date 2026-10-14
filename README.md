# Campus Life Planner

## 1.Project Overview

Campus Life Planner is a responsive web application that helps students organize academic assignments,campus events,and personal tasks.Users will be able to add,view,search,sort,edit and delete activities.

## 2.Project Objectives

-Help students manage activities and deadlines.
-Display useful statistics about planned activities.
-Allow users to search, filter  and sort activities.
-Save activity data in the browser.
-Provide an accessible experience on mobile,tablet and desktop.
-Support a balanced campus life by including academic and non-academic activities.

## 3.Features
-Add and validate activities.
-Search activities using regular expressions.
-Filter activities by tag and sort them.
-Display dashboard statistics and activity targets.
-Edit, and delete activities.
-Import and export activity data as JSON.
-Save activities using local Storage.
-Configure duration units.
-Provide a responsive layout for different screens sizes.

## 4.Initial Wireframe
+----------------------------------+
|       CAMPUS LIFE PLANNER        |
|      Main Navigation Links       |
+----------------------------------+
|          DASHBOARD               |
|Total | Upcoming | Completed|     |
|Duration | Most Common Tag        |
+----------------------------------+
|           ACTIVITIES             +
|Search | Tag Filter |Sort         |
|Activity cards                    |
+----------------------------------+
|      ADD  ACTIVITY               |
| Title                            |
| Due Date                         |
| Duration                         |
| Tag                              |
| [Add Activity]                   |
+----------------------------------+
|          ABOUT                   |
| Project purpose and contact      |
+----------------------------------+

## 5.Data Model
Each activity will be represented as a javascript object with these fields:

|Field | Purpose |
|---|---|
| id | Unique activity identifier |
| title | Activity name |
| dueDate | Activity deadline |
| duration | Estimated time in minutes |
| tag | Category or label used to group activities |
| status| Activity status| 
| createdAt | Date and time the activity was created |
| updatedAt | Date and time the  activity was last updated |

## 6. Technology
HTML5 for page structure.
CSS3 for styling, layouts, and responsiveness.
Vanilla JavaScript  for application functionality.
JavaScript ES modules for organizing code.
Browser localStorage for data persistence.
JSON for importing and exporting activity data.
Git and Github for version control and hosting.

## 7. Responsive Design Plan
-Mobile:approximately 360px wide.
-Tablet:approximately 768px wide.
-Desktop:approximately 1024px and wider.

## 8. Regex Catalog
The application uses regular expressions to validate activity information and support search.
| Validation  | Purpose | Example |
|Title validation | Checks that the title has an acceptable length and doesn't contain HTML tags | Complete assignment |
| Date format | Checks the expected YYYY-MM-DD format | 2026-10-15|
|Tag validation | Allow letters, spaces, and hyphens, starting with a letter | Personal |

## 9.Accessibility Notes
The applocation aims to support users with different accessibility needs through:
-Semantic HTML landmarks and a logical heading hierarchy.
-Labels associated with from controls
-A skip-to-content link.
-Visible keyboard focus indicators.
-Accessible status and error messages using ARIA live regions.
-Keyboard-accessible navigation and controls.
-Readable text and adequate color contrast.
-Responsive layouts across mobile, tablet, and desktop screens.
## 10. Keyboard Navigation Map
|Key  | Expected behavior |
| Tab | Move to the next focusable control |
| shift + tab |Move to the previous focusable control |
| Enter | Activate links and buttons  when supported |
| space | Activate buttons or toggle supported controls |

## 11. Data Persistence and JSON
The application uses localStorage to retain saved activities and settings between page visits.

JSON export allows activity data to be saved to a file.JSON import should validate the file's structure  and activity fields before loading records into the application.

## 12. Testing Instructions 
1.Open the project in Visual Studio Code
2.Start a local development server that supports JavaScript ES modules.
3.Open index.html in your browser through the server.
4.Open tests.html through the same server to run the validation tests.
5.Test adding, editing, deleting, searching, sorting, and filtering activities.
6.Refresh the application to check localStorage persistence.
7.Test JSON import and export.
8.Check key board navigation and responsive layouts at mobile, tablet, and desktop widths.



## 13. Running the project locally

1.Clone or download the project repository.
2.Open the project folder in Visual Studio Code.
3.Start a local server, such as the Live Server extension.
4.Open index.html in your browser.
5.Open tests.html to run the tests.

## 14.Contact and Project Information
Project:Campus Life Planner
GitHub profile: https://github.com/Annualite1
Email:a.muhimpund@alustudent.com
Repository:https://github.com/Annualite1/Campus_Life_Planner-.git
Live website:

