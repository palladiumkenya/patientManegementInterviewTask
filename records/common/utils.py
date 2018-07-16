from enum import Enum

class ChoiceEnum(Enum):
    @classmethod
    def choices(cls):
        return tuple((i.name, i.value) for i in cls)

class BinaryStatus(ChoiceEnum):
    Y = "Yes"
    N = "No"

class Gender(ChoiceEnum):
    F = "Female"
    M = "Male"

class County(ChoiceEnum):
    N = "Nairobi County"
    M = "Mombasa County"
    K = "Kilifi County"
    NY = "Nyeri County"
    KS = "Kisumu County"

class ContactType(ChoiceEnum):
    T = "Telephone"
    E = "Email"
    A = "Postal Address"

class ActionType(ChoiceEnum):
    A = "Add Record"
    E = "Edit Record"
    D = "Delete Record"
    S = "Search Operation"
    P = "API Access"
    