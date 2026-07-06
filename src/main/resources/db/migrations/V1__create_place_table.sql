CREATE TABLE place (
    id             BIGSERIAL PRIMARY KEY,
    name           VARCHAR(255) NOT NULL,
    area           VARCHAR(255),
    type           VARCHAR(50),
    budget         VARCHAR(50),
    description    TEXT,
    latitude       DOUBLE PRECISION,
    longitude      DOUBLE PRECISION,
    exclude_place_id BIGINT
);