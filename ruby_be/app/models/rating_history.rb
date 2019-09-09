class RatingHistory < ApplicationRecord
  validates :idUser, presence: true
  validates :idMedic, presence: true
  validates :value, presence: true
  validates :timestamp, presence: true
  validates :comment, presence: true
end
