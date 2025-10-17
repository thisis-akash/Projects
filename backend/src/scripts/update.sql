USE drug_info_db;

-- Update generic_name column to handle longer drug names
ALTER TABLE drugs
MODIFY generic_name VARCHAR(1000);