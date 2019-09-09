class Medic < ApplicationRecord
  validates :name, presence: true
  validates :specialization, presence: true
  validates :graduation_year, presence: true
  validates :image, presence: true
end
