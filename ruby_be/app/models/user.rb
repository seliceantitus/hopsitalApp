class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true
  validates :role, presence: true
  validates :password, presence: true
  validates :image, presence: true
end
