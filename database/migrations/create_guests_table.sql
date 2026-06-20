CREATE TABLE IF NOT EXISTS guests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_info JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_contact_info CHECK (
        contact_info->>'phone' IS NOT NULL AND contact_info->>'email' IS NOT NULL AND contact_info->>'address' IS NOT NULL
    )
); 

