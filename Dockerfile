FROM python:3.12-alpine

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && addgroup --system app \
    && adduser --system --ingroup app app

WORKDIR /app

COPY requirements.txt .
RUN python -m pip install --no-cache-dir --upgrade "pip>=26.2.0" \
    && python -m pip install --no-cache-dir -r requirements.txt

COPY --chown=app:app app ./app

USER app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]