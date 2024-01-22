import pytest
from devboard.tests.views.fixtures.user_fixtures import create_regular_user, create_super_user

@pytest.mark.django_db
def test_get_me_info_when_user_is_not_authenticated(client):
    response = client.get("/devboard/api/auth/me/")
    json_data = response.json()
    assert json_data == { "signin": False }
    assert response.status_code == 403
    
