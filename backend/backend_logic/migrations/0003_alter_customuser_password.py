# Generated by Django 4.1.6 on 2023-02-10 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_logic', '0002_alter_customuser_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='password',
            field=models.CharField(default='pbkdf2_sha256$390000$lTzSyIxVEjswn4RiHg6Dkj$DqrkI3OB9rEAxWNdI08IjIqi6dqBczupE+pdQYjdjVY=', max_length=128),
        ),
    ]
