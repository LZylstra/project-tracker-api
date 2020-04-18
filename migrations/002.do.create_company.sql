CREATE TABLE company (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  company_name TEXT NOT NULL UNIQUE
);

ALTER TABLE users
    ADD COLUMN
        companyid INTEGER REFERENCES company(id) ON DELETE SET NULL;