import { Section } from './content';

export const sqlContent: Section[] = [
  {
    id: 'sql-basics',
    title: 'SQL – Relational Databases',
    blocks: [
      {
        type: 'text',
        content: `**What is SQL?**
SQL (Structured Query Language) is used for **relational databases**. Data is highly structured, follows a fixed schema, and is connected through relationships.

### Key characteristics
* Fixed schema (tables, columns, data types)
* Strong consistency (ACID)
* Clear relations (primary / foreign keys)
* Ideal for structured and transactional data

### Common SQL databases
* PostgreSQL
* MySQL / MariaDB
* SQL Server
* Oracle`
      },
      {
        type: 'text',
        content: '### Basic SQL commands'
      },
      {
        type: 'code',
        language: 'sql',
        content: 'SELECT * FROM users;',
        filename: 'Select All'
      },
      {
        type: 'code',
        language: 'sql',
        content: 'SELECT name, email FROM users WHERE active = true;',
        filename: 'Filter'
      },
      {
        type: 'code',
        language: 'sql',
        content: `INSERT INTO users (name, email)
VALUES ('Max', 'max@mail.com');`,
        filename: 'Insert'
      },
      {
        type: 'code',
        language: 'sql',
        content: `UPDATE users
SET active = false
WHERE id = 5;`,
        filename: 'Update'
      },
      {
        type: 'code',
        language: 'sql',
        content: `DELETE FROM users
WHERE id = 5;`,
        filename: 'Delete'
      }
    ]
  },
  {
    id: 'advanced-sql',
    title: 'Relationships & Aggregation',
    blocks: [
      {
        type: 'text',
        content: '### Relationships (JOINs)'
      },
      {
        type: 'code',
        language: 'sql',
        content: `SELECT orders.id, users.name
FROM orders
JOIN users ON orders.user_id = users.id;`,
        filename: 'Inner Join'
      },
      {
        type: 'text',
        content: '### Grouping & aggregation'
      },
      {
        type: 'code',
        language: 'sql',
        content: `SELECT role, COUNT(*)
FROM users
GROUP BY role;`,
        filename: 'Group By'
      },
       {
        type: 'text',
        content: '### Indexes (performance)'
      },
      {
        type: 'code',
        language: 'sql',
        content: `CREATE INDEX idx_users_email
ON users(email);`,
        filename: 'Create Index'
      },
      {
        type: 'text',
        content: '### Transactions (ACID)'
      },
      {
        type: 'code',
        language: 'sql',
        content: `BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`,
        filename: 'Transaction'
      }
    ]
  },
  {
    id: 'nosql-basics',
    title: 'NoSQL – Non-relational Databases',
    blocks: [
      {
        type: 'text',
        content: `**What is NoSQL?**
NoSQL databases are **schema-flexible** and store data in formats such as documents, key-value pairs, columns, or graphs.

### Key characteristics
* No fixed schema
* Horizontal scalability
* High performance for large datasets
* Often eventual consistency

### Types of NoSQL databases
* Document-based: MongoDB
* Key-Value: Redis
* Column-based: Cassandra
* Graph: Neo4j`
      },
       {
        type: 'text',
        content: '### Example: Document-based (MongoDB)'
      },
      {
        type: 'code',
        language: 'json',
        content: `{
  "_id": "u123",
  "name": "Max",
  "email": "max@mail.com",
  "roles": ["admin", "editor"]
}`,
        filename: 'Document.json'
      },
       {
        type: 'text',
        content: '### MongoDB queries'
      },
      {
        type: 'code',
        language: 'javascript',
        content: 'db.users.find({ active: true })',
        filename: 'Find'
      },
      {
        type: 'code',
        language: 'javascript',
        content: `db.users.insertOne({
  name: "Anna",
  email: "anna@mail.com"
})`,
        filename: 'Insert'
      },
      {
        type: 'code',
        language: 'javascript',
        content: `db.users.updateOne(
  { name: "Max" },
  { $set: { active: false } }
)`,
        filename: 'Update'
      }
    ]
  },
  {
    id: 'comparison',
    title: 'SQL vs NoSQL',
    blocks: [
      {
        type: 'text',
        content: `### Direct Comparison

| Topic             | SQL                      | NoSQL                         |
| ----------------- | ------------------------ | ----------------------------- |
| Schema            | fixed                    | flexible                      |
| Structure         | tables & relations       | documents / key-value / graph |
| Consistency       | ACID                     | usually eventual              |
| Scalability       | vertical                 | horizontal                    |
| Queries           | complex JOINs            | simpler queries               |
| Typical use cases | banking, ERP, accounting | big data, realtime apps, logs |
`
      },
      {
        type: 'text',
        content: `### When to use which?

**Use SQL when:**
* Data relationships are important
* Transactions must be consistent
* Data structure is stable
* Reporting and complex queries are required

**Use NoSQL when:**
* Data structure changes frequently
* Very high read/write throughput is needed
* Horizontal scaling is required
* Flexible data models are preferred

> **Rule of thumb**
> **SQL** = structure & consistency
> **NoSQL** = flexibility & scalability`
      }
    ]
  }
];
