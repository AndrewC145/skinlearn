from django.test import TestCase
from .serializer import UserSerializer


# Create your tests here.
class UserSerializerTest(TestCase):
    def test_create_user(self):
        data = {
            "username": "createuser1",
            "email": "createuser@create.com",
            "password": "supersecurepassword1234",
            "confirmPassword": "supersecurepassword1234",
            "skin_type": "Sensitive",
        }
        serializer = UserSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    def test_non_match(self):
        data = {
            "username": "createuser2",
            "email": "createuser2@create.com",
            "password": "supersecurepassword1234",
            "confirmPassword": "notasecurepassword1234",
            "skin_type": "Oily",
        }

        serializer = UserSerializer(data=data)
        self.assertFalse(serializer.is_valid())

    def test_passwords_match(self):
        data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "securepassword1234",
            "confirmPassword": "securepassword1234",
            "skin_type": "Dry",
        }

        serializer = UserSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    def test_passwords_not_match(self):
        data = {
            "username": "testuser2",
            "email": "test2@example.com",
            "password": "securepassword1234",
            "confirmPassword": "wrongpassword",
            "skin_type": "Dry",
        }

        serializer = UserSerializer(data=data)
        self.assertFalse(serializer.is_valid())

    def test_invalid_skin_type(self):
        data = {
            "username": "testuser3",
            "email": "test3@example.com",
            "password": "securepassword12",
            "confirmPassword": "securepassword12",
            "skin_type": "NotaRealType",
        }
        serializer = UserSerializer(data=data)
        self.assertFalse(serializer.is_valid())

    def test_invalid_password(self):
        data = {
            "username": "testuser4",
            "email": "test4@example.com",
            "password": "test",
            "confirmPassword": "test3",
            "skin_type": "Acne",
        }
        serializer = UserSerializer(data=data)
        self.assertFalse(serializer.is_valid())
