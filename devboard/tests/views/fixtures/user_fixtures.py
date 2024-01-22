import pytest
from ..factories.user_factory import UserFactory

@pytest.fixture(name="regular_user")
def create_regular_user():
    return UserFactory.create()

@pytest.fixture(name="super_user")
def create_super_user():
    return UserFactory.create(is_superuser=True, is_staff=True)
