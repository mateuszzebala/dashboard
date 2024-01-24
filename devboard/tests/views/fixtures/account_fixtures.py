import pytest
from ..factories.account_factory import AdminAccountFactory

@pytest.fixture(name="super_user_account")
def create_super_user_account():
    return AdminAccountFactory.create()

