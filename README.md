# Campus Life Planner

## 1.Project Overview

Campus Life Planner is a responsive web application that helps students organize academic assignments,campus events,and personal tasks.Users will be able to add,view,search,sort,edit and delete activities.

## 2.Project Objectivities

-Help students manage activities and deadlines.
-Display useful statistics about planned activities.
Allow users to search and sort activities.
-Save activity data in the browser.
-Provide an accessible experience on mobile,table and desktop.
## 3.Planned Features
-Add and validate activities.
-Search activities using regular expressions.
-Filter activities by tag and sort them.
-Display dashboard statistics and activity targets.
-Edit,complete,and delete activities.
-Import and export activity data as JSON.
-Save activities using local Storage.
-Configure duration units.

###4.Initial Wireframe
+----------------------------------+
|       CAMPUS LIFE PLANNER        |
|      Main Navigation Links       |
+----------------------------------+
|          DASHBOARD               |
|Total | Upcoming | Completed      |
+----------------------------------+
|           ACTIVITIES             +
|Search | Tag Filter |Sort         |
|Activity cards or List            |
+----------------------------------+
|      ADD NEW ACTIVITY            |
| Title                            |
| Due Date                         |
| Duration                         |
| Tag                              |
| [Add Activity]                   |
+----------------------------------+
|          FOOTER                  |
+----------------------------------+

## 5.Initial Data Model
Each activity will be represented as a javascript object with these fields:

|Field | Purpose |
|---|---|
| id | Unique activity identifier |
| title | Activity name |
| dueDate | Activity deadline |
| duration | Estimated time in minutes |
| tag | Activity deadline |
| completed | Whether the activity is complete |
|updatedAt | Date and time of the latest update |

## 6. Accessibility Plan
-Use sematic HTML landmarks and headings.
-Provide labels for all form fields.
-Support keyboard navigation and visible focus.
-Include a skip-to-main-content link.
-Use accessible status messages for errors and updates.
-Maintain readable text and sufficient color contrast.
-Use responsive layouts for different screen sizes.
## 7. Technology
-HTML5
-CSS3
-Vanilla JavaScript
-Browser localStorage
-Git and Github
## 8. Responsive Design Plan
-Mobile:approximately 360px wide.
-Tablet:approximately 768px wide.
-Desktop:approximately 1024px and wider.

