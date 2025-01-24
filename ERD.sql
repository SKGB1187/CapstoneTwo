+------------------+            +------------------------+
|      User        |            |    UserProgress       |
+------------------+            +------------------------+
| id (PK)          |<---------->| id (PK)               |
| name             |            | userId (FK)           |
| email (Unique)   |            | word                  |
| password         |            | listName              |
| createdAt        |            | status                |
| updatedAt        |            | attempts              |
+------------------+            | createdAt             |
                                | updatedAt             |
                                +------------------------+
