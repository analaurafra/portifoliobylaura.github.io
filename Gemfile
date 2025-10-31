# frozen_string_literal: true

source "https://rubygems.org"

# gem "jekyll", "~> 4.2"
# gem "github-pages", group: :jekyll_plugins
gem "jekyll", "~> 4.3"
gemspec

group :jekyll_plugins do
    gem "jekyll-feed", "~> 0.6"
    gem "jekyll-sitemap"
    gem "jekyll-paginate"
    gem "jekyll-seo-tag"
    gem 'jekyll-redirect-from'
end

# Evita polling no Windows
gem 'wdm', '>= 0.1.0' if Gem.win_platform?
