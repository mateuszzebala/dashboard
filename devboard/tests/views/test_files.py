import pytest
import os
import shutil
from devboard.tests.views.fixtures.user_fixtures import create_regular_user, create_super_user

class URLS:
    FOLDER_CONTENT = "/devboard/api/files/content/"
    MKDIR = "/devboard/api/files/mkdir/"
    REMOVE = "/devboard/api/files/remove/"
    TOUCH = "/devboard/api/files/touch/"
    ZIP = "/devboard/api/files/zip/"
    MOVE = "/devboard/api/files/move/"

@pytest.mark.django_db
def test_get_content_of_project_folder(client, super_user):
    client.force_login(super_user)
    response = client.post(URLS.FOLDER_CONTENT, data={
        'path': '.'
    })
    json_data = response.json()
    assert len(json_data['files']) > 0
    assert len(json_data['folders']) > 0
    
    for file in json_data['files']:
        assert file['is_file'] == True
        assert os.path.exists(file['path'])
        assert os.path.basename(file['path']) == file['name']
        assert os.access(file['path'], os.W_OK) == file['access']
        
    for folder in json_data['folders']:
        assert folder['is_file'] == False
        assert os.path.exists(file['path'])
        assert os.path.basename(file['path']) == file['name']
        assert os.access(file['path'], os.W_OK) == file['access']
    
    assert json_data['permission_error'] == False
    assert json_data['sep'] == os.sep
    assert response.status_code == 200
    

@pytest.mark.django_db
def test_mkdir_view(client, super_user):
    client.force_login(super_user)
    response = client.post(URLS.MKDIR, data={
        'path': '.',
        'name': 'test_folder'
    })
    json_data = response.json()
    assert json_data.get('done') == True
    assert os.path.exists('test_folder')
    assert os.path.isdir('test_folder')
    os.rmdir('test_folder')

@pytest.mark.django_db
def test_remove_file_view(client, super_user):
    client.force_login(super_user)
    os.mkdir('test_folder')
    response = client.post(URLS.REMOVE, data={
        'paths': 'test_folder',
    })
    json_data = response.json()
    assert json_data['done'] == True
    assert os.path.exists('test_folder') == False
    

@pytest.mark.django_db
def test_create_file_view(client, super_user):
    client.force_login(super_user)
    response = client.post(URLS.TOUCH, data={
        'path': '.',
        'name': 'test_file.txt'
    })
    json_data = response.json()
    assert json_data['error'] is None
    assert os.path.exists('test_file.txt') == True
    os.remove('test_file.txt')


@pytest.mark.django_db
def test_create_zip_from_two_files(client, super_user):
    client.force_login(super_user)
    file = open('file1.txt', 'w')
    file.close()
    file = open('file2.txt', 'w')
    file.close()
    response = client.post(URLS.ZIP, data={
        'toSave': '.',
        'filename': 'test.zip',
        'items': 'file1.txt;;;file2.txt'
    })
    os.remove('file1.txt')
    os.remove('file2.txt')
    json_data = response.json()
    assert json_data.get('error') is None
    assert os.path.exists('test.zip') == True
    os.remove('test.zip')


@pytest.mark.django_db
def test_move_files_view(client, super_user):
    client.force_login(super_user)
    os.mkdir('test_folder')
    file = open('file1.txt', 'w')
    file.close()
    file = open('file2.txt', 'w')
    file.close()
    response = client.post(URLS.MOVE, data={
        'moveTo': 'test_folder',
        'items': 'file1.txt;;;file2.txt',
        'copy': 'true'
    })
    json_data = response.json()
    assert json_data['done']
    assert os.path.exists('test_folder/file1.txt')
    assert os.path.exists('file1.txt')
    assert os.path.exists('test_folder/file2.txt')
    assert os.path.exists('file2.txt')
    shutil.rmtree('test_folder')
    os.mkdir('test_folder')
    response = client.post(URLS.MOVE, data={
        'moveTo': 'test_folder',
        'items': 'file1.txt;;;file2.txt',
        'copy': 'false'
    })
    json_data = response.json()
    assert json_data['done']
    assert os.path.exists('test_folder/file1.txt')
    assert not os.path.exists('file1.txt')
    assert os.path.exists('test_folder/file2.txt')
    assert not os.path.exists('file2.txt')
    shutil.rmtree('test_folder')


    
    