import re

def to_camel(string: str) -> str:
    parts = re.split("_+", string.strip("_"))
    return parts[0] + "".join(word.capitalize() for word in parts[1:])
