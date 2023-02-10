# from user.models import (
#     Timestampable,
#     Authorable,
#     Sharable
# )
# from django.db import models

# class Session(Timestampable, Authorable, Sharable):
#     difficulty_choices = (
#         ('HARD','hard'),
#         ('MEDIUM','medium'),
#         ('EASY','easy'),
#         ('VERY_EASY','very easy'),
#     )
#     session_title = models.CharField(max_length = 100)
#     session_description = models.TextField(null=True)
#     objective = models.TextField(null=True)
#     is_video = models.BooleanField(default = False, null=True)
#     difficulty = models.CharField(max_length = 100, choices=difficulty_choices, null=True, default=difficulty_choices[2][1])
