CREATE TABLE Documnets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    url TEXT NOT NULL UNIQUE,

    title TEXT,
    snippet TEXT,
    content TEXT,
    text_content TEXT,

    excerpt TEXT,
    length INTEGER,
    byline TEXT,
    dir TEXT,
    site_name TEXT,
    lang TEXT,
    published_time TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)