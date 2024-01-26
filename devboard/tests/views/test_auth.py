import pytest
from devboard.tests.views.fixtures.user_fixtures import create_regular_user, create_super_user

class URLS:
    ME = "/devboard/api/auth/me/"
    TEST = "/devboard/api/auth/test/"

@pytest.mark.django_db
def test_get_me_info_when_user_is_not_authenticated(client):
    response = client.get(URLS.ME)
    json_data = response.json()
    assert json_data == { "signin": False }

    
@pytest.mark.django_db
def test_get_me_info_when_user_is_not_superuser(client, regular_user):
    client.force_login(regular_user)
    response = client.get(URLS.ME)
    json_data = response.json()
    assert json_data['username'] == regular_user.username
    assert json_data['first_name'] == regular_user.first_name
    assert json_data['devboard_access'] == False
    assert response.status_code == 200
    
@pytest.mark.django_db
def test_get_me_info_when_user_is_superuser(client, super_user):
    client.force_login(super_user)
    response = client.get(URLS.ME)
    json_data = response.json()
    assert json_data['username'] == super_user.username
    assert json_data['first_name'] == super_user.first_name
    assert json_data['devboard_access'] == True
    assert response.status_code == 200

@pytest.mark.django_db
def test_get_test_view_user_is_superuser(client, super_user):
    client.force_login(super_user)
    response = client.get(URLS.TEST)
    json_data = response.json()
    assert json_data.get('success') is not None
    assert response.status_code == 200
    
@pytest.mark.django_db
def test_get_test_view_user_is_not_superuser(client, regular_user):
    client.force_login(regular_user)
    response = client.get(URLS.TEST)
    json_data = response.json()
    assert json_data.get('error') is not None
    assert response.status_code == 403


