from passlib.context import CryptContext
import hashlib
import time
import bleach
from slugify import slugify
import html

pwd_context = CryptContext(schemes=['bcrypt'])

def hash_password(password:str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password:str, hash_password:str) -> bool:
    return pwd_context.verify(plain_password, hash_password)

def hash_token(token:str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()

def get_slug(name: str) -> str:
    base_slug = slugify(name)
    return f"{base_slug}-{int(time.time())}"

def sanitize_html(html_content: str) -> str:
    unescaped_html = html.unescape(html_content)
    allowed_tags = [
        "p", "strong", "em", "u", "ul", "ol", "li",
        "a", "br", "h1", "h2", "h3", "h4", "h5", "h6",
        "img", "span"
    ]
    allowed_attrs = {
        "a": ["href", "title", "target"],
        "img": ["src", "alt", "width", "height"],
        "span": ["style"],
    }
    cleaner = bleach.Cleaner(
        tags=allowed_tags,
        attributes=allowed_attrs,
        strip=True
    )
    return cleaner.clean(unescaped_html)