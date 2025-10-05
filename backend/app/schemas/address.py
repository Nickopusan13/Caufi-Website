from pydantic import BaseModel, ConfigDict
from app.schemas.to_camel import to_camel

class AddressInput(BaseModel):
    label: str
    recipient_name: str
    recipient_number: str
    province: str
    city: str
    district: str
    sub_district: str
    full_address: str
    notes_for_courier: str | None = None
    is_default: bool = False
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

class AddressOut(AddressInput):
    id: int
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
