import pytest
import os
import shutil
from devboard.tests.views.fixtures.user_fixtures import create_regular_user, create_super_user
from devboard.tests.views.fixtures.account_fixtures import create_super_user_account

class URLS:
    GET_ACCOUNT = "/devboard/api/users/"

@pytest.mark.django_db
def test_get_content_of_project_folder(client, super_user_account):
    client.force_login(super_user_account.user)
    assert super_user_account.user is not None
    response = client.get(f"{URLS.GET_ACCOUNT}{super_user_account.user.id}/")
    json_data = response.json()
    assert json_data.get('username') == super_user_account.user.username
    

